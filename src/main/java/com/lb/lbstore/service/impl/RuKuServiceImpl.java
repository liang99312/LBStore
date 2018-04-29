/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lb.lbstore.service.impl;

import com.lb.lbstore.dao.RuKuDao;
import com.lb.lbstore.domain.RuKu;
import com.lb.lbstore.service.RuKuService;
import java.util.HashMap;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author Administrator
 */
@Service("ruKuServiceImpl")
public class RuKuServiceImpl implements RuKuService {

    @Autowired
    private RuKuDao ruKuDao;

    @Override
    public RuKu getRuKuById(Integer id) {
        return (RuKu) ruKuDao.findObjectById(RuKu.class, id);
    }

    @Override
    public List<RuKu> getAllRuKus(Integer qy_id) {
        return ruKuDao.getResult("from RuKu ruKu where qy_id="+qy_id, null);
    }

    @Override
    public boolean updateRuKu(RuKu ruKu) {
        return ruKuDao.updateRuKu(ruKu);
    }

    @Override
    public RuKu saveRuKu(RuKu ruKu) {
        int id = ruKuDao.saveRuKu(ruKu);
        return (RuKu) ruKuDao.findObjectById(RuKu.class, id);
    }

    @Override
    public boolean deleteRuKu(Integer id) {
        return ruKuDao.deleteRuKu(id);
    }

    @Override
    public int queryRows(HashMap map) {
        String sql = "select (1) from RuKu where qy_id="+map.get("qy_id");
        if (map.containsKey("mc")) {
            sql += " and mc like '%" + map.get("mc") + "%'";
        }
        if (map.containsKey("state")) {
            sql += " and state = " + map.get("state");
        }
        return ruKuDao.getCount(sql, null);
    }

    @Override
    public List<RuKu> queryRuKusByPage(HashMap map) {
        String hql = "from RuKu where qy_id="+map.get("qy_id");
        if (map.containsKey("mc")) {
            hql += " and mc like '%" + map.get("mc") + "%'";
        }
        if (map.containsKey("state")) {
            hql += " and state = " + map.get("state");
        }
        return ruKuDao.getPageList(hql, null, 1, 20);
    }

}
