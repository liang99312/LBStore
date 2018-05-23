/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lb.lbstore.service.impl;

import com.lb.lbstore.dao.KuCunDao;
import com.lb.lbstore.domain.KuCun;
import com.lb.lbstore.service.KuCunService;
import java.util.HashMap;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author Administrator
 */
@Service("kuCunServiceImpl")
public class KuCunServiceImpl implements KuCunService {

    @Autowired
    private KuCunDao kuCunDao;

    @Override
    public KuCun getKuCunById(Integer id) {
        return (KuCun) kuCunDao.getKuCunById(id);
    }

    @Override
    public boolean updateKuCun(KuCun kuCun) {
        return kuCunDao.updateRuKu(kuCun);
    }

    @Override
    public boolean deleteKuCun(Integer id) {
        return kuCunDao.deleteObjById("kuCun", id);
    }

    @Override
    public int queryRows(HashMap map) {
        String sql = "select (1) from KuCun where qy_id="+map.get("qy_id");
        if (map.containsKey("mc")) {
            sql += " and mc like '%" + map.get("mc") + "%'";
        }
        if (map.containsKey("state")) {
            sql += " and state = " + map.get("state");
        }
        return kuCunDao.getCount(sql, null);
    }

    @Override
    public List<KuCun> queryKuCunsByPage(HashMap map) {
        return kuCunDao.queryKuCunsByPage(map);
    }

}
