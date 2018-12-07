/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lb.lbstore.service;

import com.lb.lbstore.domain.SunHao;
import java.util.HashMap;
import java.util.List;

/**
 *
 * @author Administrator
 */
public interface SunHaoService {

    public SunHao getSunHaoById(Integer id);
    
    public SunHao getSunHaoDetailById(Integer id);
       
    public boolean updateSunHao(SunHao sunHao);
    
    public boolean dealSunHao(SunHao sunHao,Integer a01_id);
    
    public SunHao saveSunHao(SunHao sunHao);
    
    public boolean deleteSunHao(Integer id);
    
    public int queryRows(HashMap map);
    
    public List<SunHao> querySunHaosByPage(HashMap map);

}
