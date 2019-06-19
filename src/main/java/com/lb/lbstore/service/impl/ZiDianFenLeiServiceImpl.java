/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lb.lbstore.service.impl;

import com.lb.lbstore.dao.ZiDianFenLeiDao;
import com.lb.lbstore.domain.ZiDianFenLei;
import com.lb.lbstore.service.ZiDianFenLeiService;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author Administrator
 */
@Service("ziDianFenLeiServiceImpl")
public class ZiDianFenLeiServiceImpl implements ZiDianFenLeiService {

    @Autowired
    private ZiDianFenLeiDao ziDianFenLeiDao;

    @Override
    public ZiDianFenLei getZiDianFenLeiById(Integer id) {
        return (ZiDianFenLei) ziDianFenLeiDao.findObjectById(ZiDianFenLei.class, id);
    }

    @Override
    public List<ZiDianFenLei> getAllZiDianFenLeis(Integer qy_id) {
        List parameters = new ArrayList();
        parameters.add(qy_id);
        return ziDianFenLeiDao.getResult("from ZiDianFenLei ziDianFenLei where qy_id=?", parameters.toArray());
    }

    @Override
    public boolean updateZiDianFenLei(ZiDianFenLei ziDianFenLei) {
        return ziDianFenLeiDao.update(ziDianFenLei);
    }

    @Override
    public ZiDianFenLei saveZiDianFenLei(ZiDianFenLei ziDianFenLei) {
        int id = ziDianFenLeiDao.save(ziDianFenLei);
        return (ZiDianFenLei) ziDianFenLeiDao.findObjectById(ZiDianFenLei.class, id);
    }

    @Override
    public boolean deleteZiDianFenLei(Integer id) {
        return ziDianFenLeiDao.deleteZiDianFenLei(id);
    }

    @Override
    public int queryRows(HashMap map) {
        List parameters = new ArrayList();
        parameters.add(map.get("qy_id"));
        String sql = "select count(1) from ZiDianFenLei where qy_id=?";
        if (map.containsKey("mc")) {
            sql += " and mc like ?";
            parameters.add("%" + map.get("mc") + "%");
        }
        return ziDianFenLeiDao.getCount(sql, parameters.toArray());
    }

    @Override
    public List<ZiDianFenLei> queryZiDianFenLeisByPage(HashMap map) {
        List parameters = new ArrayList();
        parameters.add(map.get("qy_id"));
        String hql = "from ZiDianFenLei where qy_id=?";
        if (map.containsKey("mc")) {
            hql += " and mc like ?";
            parameters.add("%" + map.get("mc") + "%");
        }
        return ziDianFenLeiDao.getPageList(hql, parameters.toArray(), Integer.parseInt(map.get("beginRow").toString()), Integer.parseInt(map.get("pageSize").toString()));
    }

    @Override
    public boolean existZiDianFenLei(Integer qy_id, Integer id, String mc) {
        return ziDianFenLeiDao.existZiDianFenLei(qy_id, id, mc);
    }

}
